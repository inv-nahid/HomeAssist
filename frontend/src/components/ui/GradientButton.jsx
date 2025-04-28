import PropTypes from 'prop-types'

const GradientButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        bg-gradient-to-r 
        from-blue-500 to-blue-600
        text-white 
        px-4 py-2 
        rounded-md 
        font-medium
        hover:from-blue-600 hover:to-blue-700
        transition-colors
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default GradientButton