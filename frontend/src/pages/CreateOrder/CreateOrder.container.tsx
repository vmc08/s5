import { useEffect, useState } from 'react'
import { getMenuItems, GetMenuItemsResponse } from '../../services/menu'
import {
  CreateOrderPrivateProps,
  CreateOrderPublicProps,
} from './CreateOrder.props'
import CreateOrderView from './CreateOrder.view'

const CreateOrder = (props: CreateOrderPublicProps) => {
  const [menuItems, setMenuItems] = useState<GetMenuItemsResponse>({
    items: [],
    rules: {},
  })

  useEffect(() => {
    // TODO: Fetch menu data
    const fetchData = async () => {
      const result = await getMenuItems()
      setMenuItems(result)
    }
    fetchData()
  }, [])

  const generatedProps: CreateOrderPrivateProps = {
    items: menuItems.items,
    rules: menuItems.rules,
  }

  return <CreateOrderView {...generatedProps} />
}

export default CreateOrder
