import React, { useMemo, useReducer } from 'react'
import './CreateOrder.css'
import RadioInput from '../../components/RadioInput'
import { CreateOrderProps } from './CreateOrder.props'

const CreateOrderView = (props: CreateOrderProps) => {
  const { items, rules } = props

  type SelectedItems = Record<number, string>
  const [selectedItems, updateSelectedItems] = useReducer(
    (state: SelectedItems, newState: SelectedItems) => {
      // TODO: Merge selectedItems state with newState
      return {
        ...state,
        ...newState,
      }
    },
    {
      0: '',
      1: '',
      2: '',
    } as SelectedItems
  )

  const isSelected = (id: string, groupIndex: number) => {
    return id === selectedItems[groupIndex]
  }

  const blacklist: number[] = useMemo(() => {
    // TODO: Create a blacklist based on rules and currently selected items
    const newRules = Object.entries(selectedItems).reduce<number[]>(
      (ac, [_, v]) => {
        const derivedRules = rules[+v] || []
        return [...ac, ...derivedRules]
      },
      []
    )
    return newRules
  }, [rules, selectedItems])

  const isDisabled = (id: string) => {
    return blacklist.includes(+id)
  }

  const handleSelection = (value: string, groupIndex: number) => {
    updateSelectedItems({
      [groupIndex]: value,
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(selectedItems)
  }

  // TODO: If no items are available, show a "Loading..." text
  return (
    <div className="createOrder">
      {Boolean(items.length) ? (
        <form onSubmit={handleSubmit}>
          {items.map((group, groupIndex) => {
            return (
              <div key={groupIndex}>
                {group.map((item) => {
                  // TODO: Should render RadioInput component
                  return (
                    <RadioInput
                      key={item.id}
                      label={item.value}
                      value={item.id}
                      checked={isSelected(item.id, groupIndex)}
                      disabled={isDisabled(item.id)}
                      onSelect={(v) => handleSelection(v, groupIndex)}
                    />
                  )
                })}
                <br />
              </div>
            )
          })}
          <input type="submit" className="submit-button" value="Submit Order" />
        </form>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  )
}

export default CreateOrderView
