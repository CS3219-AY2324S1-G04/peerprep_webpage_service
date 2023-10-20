import { PropsWithChildren } from 'react'

export const TableBody: React.FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  const { children, ...rest } = props
  return <tbody {...rest}>{children}</tbody>
}

export const TableRow: React.FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  const { children, ...rest } = props
  return <tr {...rest}>{children}</tr>
}

export const TableCell: React.FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  const { children, ...rest } = props
  return <td {...rest}>{children}</td>
}
