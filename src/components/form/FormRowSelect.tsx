import React from 'react'

interface IProps {
  labelText?: string
  name: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  list: any
}

const FormRowSelect: React.FC<IProps> = ({
  labelText,
  name,
  value,
  handleChange,
  list
}) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText ?? name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((item: string, id: number) => (
          <option value={item} key={id}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormRowSelect
