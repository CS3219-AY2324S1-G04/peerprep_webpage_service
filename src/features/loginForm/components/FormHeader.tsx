import BaseFormHeader from '../../userForm/components/FormHeader'

const FormHeader: React.FC = () => {
  return (
    <BaseFormHeader
      title="Log in to your account"
      body={['Welcome back! Please enter your details.']}
    />
  )
}

export default FormHeader
