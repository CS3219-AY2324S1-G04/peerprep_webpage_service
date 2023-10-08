import BaseFormHeader from '../../userForm/components/FormHeader'

const FormHeader: React.FC = () => {
  return (
    <BaseFormHeader
      title="Welcome to PeerPrep! 👋🏼"
      body={[
        'Hello, I guess you are new around here.',
        "Let's start by creating your account!",
      ]}
    />
  )
}

export default FormHeader
