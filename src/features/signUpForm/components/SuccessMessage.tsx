import Paths from '../../../utils/constants/navigation'
import BaseSuccessMessage from '../../userForm/components/SuccessMessage'

const SuccessMessage: React.FC = () => {
  return (
    <BaseSuccessMessage
      title="Sign Up Successful!"
      linkLeadingMessage="You can now"
      linkMessage="Login"
      linkPath={Paths.Login}
    />
  )
}

export default SuccessMessage
