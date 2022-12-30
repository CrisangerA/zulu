export default function Typograpy({ children, size, display }) {
  return (
    <p style={{
      fontSize: size + 'px',
      margin: 0,
      display: display || 'inline'
    }}>
      {children}
    </p>
  )
}
