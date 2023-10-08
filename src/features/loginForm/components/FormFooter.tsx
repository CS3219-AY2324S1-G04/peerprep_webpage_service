import Paths from '../../../utils/constants/navigation'
import BaseFormFooter from '../../userForm/components/FormFooter'

const FormFooter: React.FC = () => {
  return (
    <BaseFormFooter
      leadingMessage="Don't have an account?"
      linkMessage="Sign up"
      linkPath={Paths.SignUp}
    />
  )
}

export default FormFooter
