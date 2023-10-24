import { List, ListItem, ListItemButton } from "@mui/joy"
import { PageNavigation } from "../../utils/constants/navigation"
import { useRouteMatch } from '../../hooks/useRouteMatch'
import { useNavigate } from "react-router-dom"
import { SxProps } from "@mui/joy/styles/types"


export interface NavigationListProps {
  list: PageNavigation[]
}

const NavigationList: React.FC<NavigationListProps> = (props: NavigationListProps) => {
  const { list } = props
  const routeMatch = useRouteMatch()
  const navigate = useNavigate()

  return (
    <List role="menubar" orientation="horizontal" sx={styles.list}>
      {list.map((page, index) => {
        const isActivePage = routeMatch.getRouteMatch(page.url)
        return (
          <ListItem key={`${page.title}-${index}`}>
            <ListItemButton
              className={isActivePage ? 'active' : ''}
              component="a"
              sx={styles.listItemButton}
              onClick={() => navigate(page.url)}
            >
              {page.title}
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

const styles = {
  list: {
    height: '100%',
    '.active': {
      borderColor: 'primary.500',
    },
  } as SxProps,
  listItemButton: {
    border: 'unset',
    borderBottom: '2px solid transparent',
  } as SxProps,
} as const

export default NavigationList
