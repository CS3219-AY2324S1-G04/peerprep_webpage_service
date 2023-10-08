import BaseForm from '../../userForm/components/Form'
import FormBody from './FormBody'
import FormFooter from './FormFooter'
import FormHeader from './FormHeader'
import SuccessMessage from './SuccessMessage'

const Form: React.FC = () => {
  return (
    <BaseForm
      FormHeader={FormHeader}
      FormBody={FormBody}
      FormFooter={FormFooter}
      SuccessMessage={SuccessMessage}
    />
  )
}

export default Form
