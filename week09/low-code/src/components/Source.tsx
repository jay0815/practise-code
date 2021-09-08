import React from 'react';
import { CSSProperties, FC, useMemo, memo } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import { LOW_CODE_COMPONENT } from '../constants';

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

export interface SourceBoxProps {
  type: string
  onToggleForbidDrag?: () => void
}

export const SourceBox: FC<SourceBoxProps> = memo(({
  type,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: LOW_CODE_COMPONENT,
      item: { type },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [type],
  )

  const containerStyle = useMemo(
    () => ({
      ...style,
      opacity: isDragging ? 0.4 : 1,
      cursor: 'move',
    }),
    [isDragging],
  )

  return (
    <div ref={drag} style={containerStyle} role="SourceBox">
      {children}
    </div>
  )
})
