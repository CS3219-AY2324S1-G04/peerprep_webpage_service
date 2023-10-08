import Paths from '../../../utils/constants/navigation'
import BaseSuccessMessage from '../../userForm/components/SuccessMessage'

const SuccessMessage: React.FC = () => {
  return (
    <BaseSuccessMessage
      title="Login Successful!"
      linkLeadingMessage="Proceed to"
      linkMessage="Dashboard"
      linkPath={Paths.Dashboard}
    />
  )
}

export default SuccessMessage
