import React, { useEffect, useState } from 'react'
import { FC, memo } from 'react'
import { ButtonDemo, InputDemo, RadiosDemo, SelectDemo, TextAreaDemo } from '../components/components'
import { Editor } from '../components/Editor'
import { SourceBox } from '../components/Source'
import { StatefulTargetBox as TargetBox, Types } from '../components/Target'
import { RADIO_DEFAULT_OPTIONS, SELECT_DEFAULT_OPTIONS } from '../constants'
import { ComponentTypes } from '../interface'

export const Container: FC = memo(() => {
  const [types, setTypes] = useState<Types[]>([])
  const [error, setError] = useState<string | null>(null)
  const update = (v?: string) => {
    if (v) {
      try {
        const real: Record<number, { type: ComponentTypes, props: any }> = JSON.parse(v);
        const nextTypes:Types[]  = [];
        Object.keys(real).forEach((i) => {
          const values = real[+i];
          nextTypes.push({
            type: values.type as unknown as ComponentTypes,
            props: values.props,
            key: +i,
          })
        })
        console.log(real, nextTypes);
        
        setTypes(nextTypes)
        if (error) {
          setError(null)
        }
      } catch (e) {
        setError((e as Error).toString());
      }
    }
  }

  const updateTypes = (item: Types) => {
    setTypes((before) => [...before, item])
  }

  const json: Record<string, any> = {};
  console.log(types);
  types.forEach(({ type, key, props }) => {
    json[key] = {
      type, props
    }
  })
  console.log(json);
  
  return (
    <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <p>drag items</p>
          <SourceBox type={ComponentTypes.INPUT}>
            <InputDemo />
          </SourceBox>
          <SourceBox type={ComponentTypes.BUTTON}>
            <ButtonDemo />
          </SourceBox>
          <SourceBox type={ComponentTypes.SELECT}>
            <SelectDemo  options={SELECT_DEFAULT_OPTIONS} value=""/>
          </SourceBox>
          <SourceBox type={ComponentTypes.RADIO}>
            <RadiosDemo options={RADIO_DEFAULT_OPTIONS} name="rd" />
          </SourceBox>
          <SourceBox type={ComponentTypes.TEXTAREA}>
            <TextAreaDemo value=""/>
          </SourceBox>
        </div>
        <div style={{ flex: 1 }}>
          <TargetBox update={updateTypes} types={types} error={error}/>
        </div>
      <div style={{ flex: 1 }}>
        <Editor value={JSON.stringify(json, null, '\t')} update={update}/>
      </div>
    </div>
  )
})

