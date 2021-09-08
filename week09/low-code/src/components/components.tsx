import React from 'react'
import { FC, memo } from 'react'
import { ComponentTypes } from '../interface'
import { RADIO_DEFAULT_OPTIONS, SELECT_DEFAULT_OPTIONS } from '../constants'

interface Options { title: string; value?: string | number; key: string }

export const InputDemo: FC = memo(() => {
  return <input type="text" placeholder="演示用输入框"/>
})

export const ButtonDemo: FC = memo(() => {
  return <button>demo</button>
})

export const SelectDemo: FC<{ options: Options[]; value: string | number }> = memo(({ options }) => {
  return <select placeholder="演示用选择器">{options.map(({ title, value, key }) => <option key={key} value={value}>{title}</option>)}</select>
})


export const TextAreaDemo: FC<{ rows?: number; cols?: number; value: string; }> = memo(({ rows = 5, cols = 5 }) => {
  return <textarea rows={rows} cols={cols} placeholder="演示用多行文本输入框" />
})


export const RadiosDemo: FC<{ options: Options[], name: string }> = memo(({ options, name }) => {
  if (options.length) {
    return <div>{ options.map(({ title, key }) => <label key={key}><input type="radio" name={name}/>{title}</label>) }</div>
  }
  return null
})



export const components: Record<ComponentTypes, React.FC<any>> = {
  input: InputDemo,
  button: ButtonDemo,
  select: SelectDemo,
  textarea: TextAreaDemo,
  radio: RadiosDemo,
}

export const componentProps: Record<ComponentTypes, Record<string, unknown>> = {
  input: {},
  button: {},
  select: {
    options: SELECT_DEFAULT_OPTIONS
  },
  textarea: {},
  radio: {
    options: RADIO_DEFAULT_OPTIONS
  },
}