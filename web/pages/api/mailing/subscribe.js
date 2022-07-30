const LIST_ID = process.env.MAILCHIMP_LIST_ID
const API_KEY = process.env.MAILCHIMP_API_KEY
const DATACENTER = API_KEY.split('-')[1]

export default async (req, res) => {
  const {email, name} = req.body

  if (!email) {
    return res.status(400).json({error: 'Email is required'})
  }

  try {
    const body = JSON.stringify({
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        NLETTER: 1,
        NAME: name || '',
      },
    })

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        body,
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )

    const data = await response.json()

    if (response.status >= 400) {
      return res.status(400).json({
        error: true,
        message: 'Whoops, there was a problem, please try again!',
        data,
      })
    } else {
      return res.status(200).json({message: 'Sign up successful!'})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: true,
      caught: true,
      message: 'Hmmm, There was an problem signing up, please try again!',
    })
  }
}
