import React, { useRef, useEffect, useState } from 'react';
import { NetworkNode, NetworkLink } from '../types/tracingArt';
import { PlaceholderImage } from './PlaceholderImage';

interface Chapter2Props {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export const Chapter2Network: React.FC<Chapter2Props> = ({ nodes: initialNodes, links }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);

  // Initialize node positions in a circle layout
  useEffect(() => {
    const width = 800;
    const height = 500;
    const radius = Math.min(width, height) * 0.35;
    const initialized = initialNodes.map((n, i) => {
      const angle = (i / initialNodes.length) * Math.PI * 2;
      return {
        ...n,
        x: width / 2 + radius * Math.cos(angle),
        y: height / 2 + radius * Math.sin(angle),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      };
    });
    setNodes(initialized);
  }, [initialNodes]);

  // HTML5 Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Links
      links.forEach((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);

        if (sourceNode?.x && sourceNode?.y && targetNode?.x && targetNode?.y) {
          const isHighlighted = selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target);

          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = isHighlighted
            ? '#10b981'
            : 'rgba(156, 163, 175, 0.25)';
          ctx.lineWidth = isHighlighted ? 2.5 : 1;
          ctx.stroke();

          // Link text if highlighted
          if (isHighlighted) {
            const midX = (sourceNode.x + targetNode.x) / 2;
            const midY = (sourceNode.y + targetNode.y) / 2;
            ctx.fillStyle = '#10b981';
            ctx.font = '10px monospace';
            ctx.fillText(link.relationship, midX + 5, midY - 5);
          }
        }
      });

      // Draw Nodes
      nodes.forEach((node) => {
        if (!node.x || !node.y) return;

        if (filterType !== 'all' && node.type !== filterType) return;

        const isSelected = selectedNode?.id === node.id;

        // Outer glow circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? 18 : 10, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? 'rgba(16, 185, 129, 0.2)'
          : node.type === 'artist'
          ? 'rgba(239, 68, 68, 0.15)'
          : node.type === 'museum'
          ? 'rgba(59, 130, 246, 0.15)'
          : 'rgba(156, 163, 175, 0.15)';
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(node.x, node.y, isSelected ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? '#10b981'
          : node.type === 'artist'
          ? '#ef4444'
          : node.type === 'museum'
          ? '#3b82f6'
          : '#6b7280';
        ctx.fill();

        // Label
        ctx.fillStyle = isSelected ? '#10b981' : '#6b7280';
        ctx.font = isSelected ? 'bold 11px monospace' : '10px monospace';
        ctx.fillText(node.name, node.x + 12, node.y + 4);
      });

      // Gentle Floating Animation
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          if (!n.x || !n.y) return n;
          let nx = n.x + (n.vx || 0);
          let ny = n.y + (n.vy || 0);
          let nvx = n.vx || 0;
          let nvy = n.vy || 0;

          if (nx < 40 || nx > canvas.width - 40) nvx *= -1;
          if (ny < 40 || ny > canvas.height - 40) nvy *= -1;

          return { ...n, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [nodes, links, selectedNode, filterType]);

  // Click Handler on Canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const clickY = (e.clientY - rect.top) * (canvas.height / rect.height);

    const clicked = nodes.find((n) => {
      if (!n.x || !n.y) return false;
      const dist = Math.hypot(n.x - clickX, n.y - clickY);
      return dist <= 20;
    });

    setSelectedNode(clicked || null);
  };

  return (
    <section className="relative min-h-screen pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      {/* Chapter Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block mb-2">
          CHAPTER 02 • TRANSACTION NETWORKS
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
          Networks of Provenance & Collectors
        </h1>
        <p className="text-sm sm:text-base font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Art history is a network. Explore how painters, aristocrats, merchant guilds, and museums form interconnected nodes of transactions.
        </p>
      </div>

      {/* Network Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs font-mono">
        {['all', 'artist', 'collector', 'dealer', 'museum'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3.5 py-1.5 rounded-full border transition-all uppercase ${
              filterType === t
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 font-semibold'
                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Network Visualizer Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Canvas Visualizer */}
        <div className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative p-4">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onClick={handleCanvasClick}
            className="w-full h-auto cursor-pointer"
          />
          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-neutral-400">
            Click any node to inspect relationship links • Floating force physics
          </div>
        </div>

        {/* Selected Node Detail Panel */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          {selectedNode ? (
            <div className="bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xl backdrop-blur-md animate-fadeIn">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                {selectedNode.type} NODE
              </span>
              <h2 className="text-xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mt-2 mb-1">
                {selectedNode.name}
              </h2>
              <span className="text-xs font-mono text-neutral-400 block mb-4">
                Active Year: {selectedNode.year} • {selectedNode.connectionsCount} Linked Connections
              </span>
              <p className="text-xs font-sans text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                {selectedNode.details}
              </p>

              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 text-xs font-mono space-y-1">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">ASSOCIATED LINKS:</span>
                {links
                  .filter((l) => l.source === selectedNode.id || l.target === selectedNode.id)
                  .map((l, idx) => (
                    <div key={idx} className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                      • {l.relationship} ({l.year})
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="bg-neutral-50 dark:bg-neutral-900/50 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-8 text-center text-xs font-mono text-neutral-400">
              Select any node in the canvas network graph to view its historical links, transaction history, and associated archives.
            </div>
          )}
        </div>
      </div>

      {/* Case Study Cards: Husband and Wife Collectors */}
      <div className="mt-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
        <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase block mb-1">
          CASE STUDY • HISTORICAL COLLECTORS
        </span>
        <h3 className="text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Husband and Wife Collections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 flex flex-col justify-between">
            <div>
              <PlaceholderImage variant="portrait" label="COLLECTOR PORTRAIT" height={160} className="mb-4" />
              <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                The Estate of Nicolaes & Sara van Suchtelen (1740)
              </h4>
              <p className="text-xs font-sans text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Joint collections documented in 18th-century probate ledgers reveal how married couples managed shared art investments and bequeathed masterworks down family lines.
              </p>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-4 block">Archive Ref: GPI-AMS-1740-99</span>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 flex flex-col justify-between">
            <div>
              <PlaceholderImage variant="archival" label="PROBATE INVENTORY" height={160} className="mb-4" />
              <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">
                Shared Domestic Display & Curatorial Choices
              </h4>
              <p className="text-xs font-sans text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                Inventories listed room-by-room demonstrate how Dutch domestic spaces served as private galleries displaying still life, portraits, and decorative porcelain.
              </p>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 mt-4 block">Archive Ref: GPI-PAR-1775-12</span>
          </div>
        </div>
      </div>
    </section>
  );
};
