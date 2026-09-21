'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/utils/helpers';

import classes from './BackgroundRippleEffect.module.scss';

export default function BackgroundRippleEffect({ cellSize = 56, className = '' }) {
  const rootRef = useRef(null);
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [grid, setGrid] = useState({ rows: 8, cols: 27 });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const update = () => {
      const width = node.clientWidth;
      const height = node.clientHeight;
      if (width <= 0 || height <= 0) return;

      setGrid({
        cols: Math.max(1, Math.ceil(width / cellSize)),
        rows: Math.max(1, Math.ceil(height / cellSize)),
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [cellSize]);

  return (
    <div ref={rootRef} className={cn(classes.root, className)} aria-hidden="true">
      <div className={classes.frame}>
        <div className={classes.overlay} />
        <DivGrid
          key={`base-${rippleKey}-${grid.rows}x${grid.cols}`}
          rows={grid.rows}
          cols={grid.cols}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
}

function DivGrid({
  className = '',
  rows = 7,
  cols = 30,
  borderColor = '#3f3f46',
  fillColor = 'rgba(14,165,233,0.3)',
  clickedCell = null,
  onCellClick,
  interactive = true,
}) {
  const cells = useMemo(() => Array.from({ length: rows * cols }, (_, idx) => idx), [rows, cols]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    width: '100%',
    height: '100%',
  };

  return (
    <div className={cn(classes.grid, className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const style = clickedCell
          ? {
              '--delay': `${delay}ms`,
              '--duration': `${duration}ms`,
              backgroundColor: fillColor,
              borderColor,
            }
          : {
              backgroundColor: fillColor,
              borderColor,
            };

        return (
          <div
            key={idx}
            className={cn(
              classes.cell,
              clickedCell && classes.cellRipple,
              !interactive && classes.cellStatic,
            )}
            style={style}
            onClick={interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined}
          />
        );
      })}
    </div>
  );
}
