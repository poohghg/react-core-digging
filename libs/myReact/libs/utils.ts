export const getContainer = (id: string = 'app') => {
  const root = document.getElementById(id)

  if (root) return root

  const div = document.createElement('div')
  div.id = id

  return document.body.appendChild(div)
}
