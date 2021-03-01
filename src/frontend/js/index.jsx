import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Form, Input, Select } from 'rfv'

import './../css/style.scss'

const validations = {
  empty: [
    {
      rule: 'isLength',
      args: { min: 1 },
      invalidFeedback: 'Please provide a value'
    }
  ]
}

const App = () => {
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const onSubmit = res => {
    if (res.isFormValid) {
      setFormIsSubmitting(true)
    }
  }
  const postSubmit = res => {
    setFormIsSubmitting(false)
  }

  return (
    <div id='app'>
      <h1>Tweet Chart</h1>

      <Form
        onSubmit={onSubmit}
        postSubmit={postSubmit}
        postOptions={{ method: 'post', url: '/get-image' }}
      >
        <fieldset disabled={formIsSubmitting}>
          <div className='formGroup'>
            <label htmlFor='tweetUrl'>
              Tweet URL
            </label>
            <Input
              type='url'
              id='tweetUrl'
              name='tweetUrl'
              validations={validations.empty}
              placeholder='https://twitter.com/elonmusk/status/1366477626429169666'
            />
          </div>

          <div className='formGroup'>
            <button>Submit</button>
          </div>
        </fieldset>
      </Form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
