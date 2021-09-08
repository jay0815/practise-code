import React from 'react'
import { CSSProperties, FC, useState, useCallback, memo } from 'react'
import { useDrop, DropTargetMonitor } from 'react-dnd'
import { LOW_CODE_COMPONENT } from '../constants'
import { ComponentTypes } from '../interface'
import { componentProps, components } from './components'
import './Target.css'

const style: CSSProperties = {
  border: '1px solid gray',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 10,
  overflowX: 'hidden',
  overflowY: 'auto',
  minHeight: '50vh',
}

interface DragItem {
  type: ComponentTypes
}


export interface TargetBoxProps {
  onDrop: (item: any) => void
  types: Types[];
  error: string | null
}

const TargetBox: FC<TargetBoxProps> = memo(({
  onDrop,
  types,
  error
}) => {
  const [{ isOver, item }, drop] = useDrop(
    () => ({
      accept: LOW_CODE_COMPONENT,
      drop(_item: DragItem) {
        onDrop(_item.type)
        return undefined
      },
      collect: (monitor: DropTargetMonitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
          item: monitor.getItem(),
        }
      },
    }),
    [onDrop],
  )

  const opacity = isOver ? 1 : 0.7

  console.log(item);
  
  return (
    <div
      ref={drop}
      style={{ ...style, opacity }}
      role="TargetBox"
    >
      <p>Drop here.</p>
      {
        error ? <div>{error}</div>
        :
        <form className="target-form">
          {
            types.map((i) => {
              const Component = components[i.type];
              if (Component) {
                return <div key={i.key}><label id={i.key+""}>{i.type}</label><Component id={i.key+""} {...i.props} /></div>
              } else {
                return <div key={i.key}>{i.type}</div>
              }
            })
          }
        </form>
      }
    </div>
  )
})

export interface Types {
  key: number;
  type: ComponentTypes;
  props: Record<string, unknown>
}

interface StatefulTargetBoxProps {
  types: Types[];
  update: (item: Types) => void
  error: string | null;
}

export const StatefulTargetBox: FC<StatefulTargetBoxProps> = ({ update, types, error }) => {
  const handleDrop = (type: ComponentTypes) => {
    const props = componentProps[type];
    if (!error) {
      update({ type, key: new Date().valueOf(), props });
    }
  };

  return (
    <TargetBox
      types={types}
      onDrop={handleDrop}
      error={error}
    />
  )
}
