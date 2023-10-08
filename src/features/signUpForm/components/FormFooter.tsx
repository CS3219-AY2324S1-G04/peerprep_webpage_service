import Paths from '../../../utils/constants/navigation'
import BaseFormFooter from '../../userForm/components/FormFooter'

const FormFooter: React.FC = () => {
  return (
    <BaseFormFooter
      leadingMessage="Already have an account?"
      linkMessage="Login"
      linkPath={Paths.Login}
    />
  )
}

export default FormFooter
