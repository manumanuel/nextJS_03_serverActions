# Server Actions

- using useFormStatus Hook, import from 'react-dom'
- its a client component
- it should enclose WITHIN the form tag
- a function define in action method of form tag
- within that function add 'use server'
- extract data from formData parameter
- pass to the function where logic added for storing data

# useActionState

- using hook 'formAction', defined under <form> tag
- 'revalidatePath' is used to update the cache [import from next/cache] without reloading the page
  eg : revalidatePath("/your-page");
- 'useOptimistic' hook allow to update data before doing server round-trip and then sync with server data response

# To upload files to a separate location

- cloudinary
- declare env variables for config
