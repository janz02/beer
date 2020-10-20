import '@testing-library/jest-dom'
import React, { FC } from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useCommonFormRules } from './useCommonFormRules'
import { Form, Button, Input } from 'antd'
import { I18nextProvider } from 'react-i18next'
import i18n from 'app/i18n'

// NOTE: because we are using antd we need to use waitFor() for assertions
// because custom antd rules are async validators

const RequiredExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="requiredInput"
          label="Required Input"
          rules={[formRules.required('This field is required.')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('required rule: without value does not pass validation', async () => {
  // Arrange
  render(<RequiredExample />)

  // Act
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => {
    expect(screen.getByText(/This field is required./)).toBeInTheDocument()
  })
})

test('required rule: with value passes validation', async () => {
  // Arrange
  render(<RequiredExample />)

  // Act
  const inputField = screen.getByLabelText(/Required Input/)
  userEvent.type(inputField, 'something')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => {
    expect(inputField).toHaveValue('something')
    expect(screen.queryByText(/This field is required./)).not.toBeInTheDocument()
  })
})

const RequiredStringExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="requiredStringInput"
          label="Required String Input"
          rules={[formRules.requiredString('This field is required string.')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('requiredString rule: empty value does not pass validation', async () => {
  // Arrange
  render(<RequiredStringExample />)

  // Act
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.getByText(/This field is required string./)).toBeInTheDocument()
  )
})

test('requiredString rule: whitespace does not pass validation', async () => {
  // Arrange
  render(<RequiredStringExample />)

  // Act
  const inputField = screen.getByLabelText(/Required String Input/)
  userEvent.type(inputField, ' ')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.getByText(/This field is required string./)).toBeInTheDocument()
  )
})

test('requiredString rule: with value pass validation', async () => {
  // Arrange
  render(<RequiredStringExample />)

  // Act
  const inputField = screen.getByLabelText(/Required String Input/)
  userEvent.type(inputField, 'something')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.queryByText(/This field is required string./)).not.toBeInTheDocument()
  )
})

const PasswordExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="passwordInput"
          label="Password Input"
          rules={[formRules.password('Incorrect password form.')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('password rule: less than 8 characters does not pass validation', async () => {
  // Arrange
  render(<PasswordExample />)

  // Act
  const inputField = screen.getByLabelText(/Password Input/)
  userEvent.type(inputField, 'Pass1?')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect password form./)).toBeInTheDocument())
})

test('password rule: more than 64 characters does not pass validation', async () => {
  // Arrange
  render(<PasswordExample />)

  // Act
  const inputField = screen.getByLabelText(/Password Input/)
  userEvent.type(
    inputField,
    'Pass1?013456789013456789013456789013456789013456789013456789013456789'
  )
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect password form./)).toBeInTheDocument())
})

test('password rule: with space does not pass validation', async () => {
  // Arrange
  render(<PasswordExample />)

  // Act
  const inputField = screen.getByLabelText(/Password Input/)
  userEvent.type(inputField, 'Password1 ?')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect password form./)).toBeInTheDocument())
})

test('password rule: without special character does not pass validation', async () => {
  // Arrange
  render(<PasswordExample />)

  // Act
  const inputField = screen.getByLabelText(/Password Input/)
  userEvent.type(inputField, 'Password1')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect password form./)).toBeInTheDocument())
})

test('password rule: with hungarian character does not pass validation', async () => {
  // Arrange
  render(<PasswordExample />)

  // Act
  const inputField = screen.getByLabelText(/Password Input/)
  userEvent.type(inputField, 'Passzwörd1?')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect password form./)).toBeInTheDocument())
})

test('password rule: with correct form pass validation', async () => {
  // Arrange
  render(<PasswordExample />)

  // Act
  const inputField = screen.getByLabelText(/Password Input/)
  userEvent.type(inputField, 'Password1?')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.queryByText(/Incorrect password form./)).not.toBeInTheDocument()
  )
})

const NumberExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="numberInput"
          label="Number Input"
          rules={[formRules.number('This is a number only field.')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('number rule: with string value does not pass validation', async () => {
  // Arrange
  render(<NumberExample />)

  // Act
  const inputField = screen.getByLabelText(/Number Input/)
  userEvent.type(inputField, 'asdf')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/This is a number only field./)).toBeInTheDocument())
})

test('number rule: with other than number characters does not pass validation', async () => {
  // Arrange
  render(<NumberExample />)

  // Act
  const inputField = screen.getByLabelText(/Number Input/)
  userEvent.type(inputField, '+1')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/This is a number only field./)).toBeInTheDocument())
})

test('number rule: with number only characters pass validation', async () => {
  // Arrange
  render(<NumberExample />)

  // Act
  const inputField = screen.getByLabelText(/Number Input/)
  userEvent.type(inputField, '123')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.queryByText(/This is a number only field./)).not.toBeInTheDocument()
  )
})

const EmailExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="emailInput"
          label="Email Input"
          rules={[formRules.email('Incorrect email.')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('email rule: 1st part cannot end with dot character', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a.@a.aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect email./)).toBeInTheDocument())
})

test('email rule: 1st part cannot start with dot character', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, '.a@a.aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect email./)).toBeInTheDocument())
})

test('email rule: 1st part can have special characters', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a$ßa@a.aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.queryByText(/Incorrect email./)).not.toBeInTheDocument())
})

test('email rule: 2nd part can have dash as special character', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a@a-a.aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.queryByText(/Incorrect email./)).not.toBeInTheDocument())
})

test('email rule: 2nd part can have dot as special character', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a@a.a.aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.queryByText(/Incorrect email./)).not.toBeInTheDocument())
})

test('email rule: 1st part cannot have more than one dot after each other', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a..a@a.aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect email./)).toBeInTheDocument())
})

test('email rule: 2nd part cannot have more than one dot after each other', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a@a..aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect email./)).toBeInTheDocument())
})

test('email rule: 3rd part cannot have less than 2 characters', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a@a.a')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Incorrect email./)).toBeInTheDocument())
})

test('email rule: minimum email form pass validation', async () => {
  // Arrange
  render(<EmailExample />)

  // Act
  const inputField = screen.getByLabelText(/Email Input/)
  userEvent.type(inputField, 'a@a.aa')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.queryByText(/Incorrect email./)).not.toBeInTheDocument())
})

const MaxExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="maxInput"
          label="Max Input"
          rules={[formRules.max(3, 'Max character length reached.')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('max rule: does not pass validation', async () => {
  // Arrange
  render(<MaxExample />)

  // Act
  const inputField = screen.getByLabelText(/Max Input/)
  userEvent.type(inputField, 'asdf')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() => expect(screen.getByText(/Max character length reached./)).toBeInTheDocument())
})

test('max rule: pass validation', async () => {
  // Arrange
  render(<MaxExample />)

  // Act
  const inputField = screen.getByLabelText(/Max Input/)
  userEvent.type(inputField, 'asd')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.queryByText(/Max character length reached./)).not.toBeInTheDocument()
  )
})

const MaxValueExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="maxValueInput"
          label="Max Value Input"
          rules={[formRules.maxValue(100, 'This field maximum number value is 100.')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('maxValue rule: does not pass validation', async () => {
  // Arrange
  render(<MaxValueExample />)

  // Act
  const inputField = screen.getByLabelText(/Max Value Input/)
  userEvent.type(inputField, '101')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.getByText(/This field maximum number value is 100./)).toBeInTheDocument()
  )
})

test('maxValue rule: string value does not pass validation', async () => {
  // Arrange
  render(<MaxValueExample />)

  // Act
  const inputField = screen.getByLabelText(/Max Value Input/)
  userEvent.type(inputField, 'asdf')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.getByText(/This field maximum number value is 100./)).toBeInTheDocument()
  )
})

test('maxValue rule: pass validation', async () => {
  // Arrange
  render(<MaxValueExample />)

  // Act
  const inputField = screen.getByLabelText(/Max Value Input/)
  userEvent.type(inputField, '100')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.queryByText(/This field maximum number value is 100./)).not.toBeInTheDocument()
  )
})

const PositiveIntegerExample: FC = () => {
  const formRules = useCommonFormRules()

  return (
    <I18nextProvider i18n={i18n}>
      <Form>
        <Form.Item
          name="positiveIntegerInput"
          label="Positive Integer Input"
          rules={[formRules.positiveInteger('This field can only be a positive integer')]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </I18nextProvider>
  )
}

test('positiveInteger rule: string value does not pass validation', async () => {
  // Arrange
  render(<PositiveIntegerExample />)

  // Act
  const inputField = screen.getByLabelText(/Positive Integer Input/)
  userEvent.type(inputField, 'asdf')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.getByText(/This field can only be a positive integer/)).toBeInTheDocument()
  )
})

test('positiveInteger rule: negative value does not pass validation', async () => {
  // Arrange
  render(<PositiveIntegerExample />)

  // Act
  const inputField = screen.getByLabelText(/Positive Integer Input/)
  userEvent.type(inputField, '-1')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.getByText(/This field can only be a positive integer/)).toBeInTheDocument()
  )
})

test('positiveInteger rule: 0 value does not pass validation', async () => {
  // Arrange
  render(<PositiveIntegerExample />)

  // Act
  const inputField = screen.getByLabelText(/Positive Integer Input/)
  userEvent.type(inputField, '0')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.getByText(/This field can only be a positive integer/)).toBeInTheDocument()
  )
})

test('positiveInteger rule: pass validation', async () => {
  // Arrange
  render(<PositiveIntegerExample />)

  // Act
  const inputField = screen.getByLabelText(/Positive Integer Input/)
  userEvent.type(inputField, '1')
  fireEvent.click(screen.getByText(/Submit/).closest('button') as HTMLButtonElement)

  // Assert
  await waitFor(() =>
    expect(screen.queryByText(/This field can only be a positive integer/)).not.toBeInTheDocument()
  )
})
