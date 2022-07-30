export default async (req, res) => {
  const {email, tags} = req.body

  if (!email) {
    return res.status(400).json({error: 'Email is required'})
  }

  try {
    const LIST_ID = process.env.MAILCHIMP_LIST_ID
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const DATACENTER = API_KEY.split('-')[1]
    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${email}/tags`,
      {
        body: JSON.stringify({tags}),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )
    if (response.status >= 400) {
      return res.status(400).json({
        error: true,
        message: `There was an error adding the mailchimp tags`,
      })
    }

    return res.status(200).json({message: 'Tags added successfully!'})
  } catch (error) {
    return res
      .status(500)
      .json({error: error || error.toString(), message: 'There was a caught error adding tags...'})
  }
}
