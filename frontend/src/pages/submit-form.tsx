import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DynamicForm } from '../components/dynamic-form';
import { Loading } from '../components/loading';
import { useNavigate } from 'react-router-dom';

type Form = {
  id: string
  name: string
  fields: any
}

type Answer = {
  question: string
  answer: string | number | boolean
}

type SubmitFormData = {
  formId: string;
  sourceData: any;
}

type Payload = {
  [key: string]: string | boolean | number
}

const useSubmitForm = () => {
  return useMutation({
    mutationFn: async ({ formId, sourceData }: SubmitFormData) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/source-record`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId,
          sourceData
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Request failed: ${error}`)
      }

      return response.json()
    },
  })
}

export const SubmitForm: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const { data: forms, isLoading } = useQuery<Form[] | undefined>({
    queryKey: ['forms'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/form`);
      if (!res.ok) throw new Error('Failed to fetch forms');
      const jsonResponse = await res.json();
      return jsonResponse.data
    }
  });
  const { mutate } = useSubmitForm()
  const navigate = useNavigate(); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedForm) return alert("Please select a form");
    console.log(`Submitting form with ID: ${selectedForm}`);
  };

  const selectForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value && forms) {
      setSelectedForm(forms.find(f => f.id === e.target.value) || null)
    }
  }

  const submit = (values: Payload) => {
    if (selectedForm) {
      const data: Answer[] = []
      for (const fieldId in values) {
        data.push({
          question: selectedForm.fields[fieldId].question,
          answer: values[fieldId]
        })
      }

      mutate({ formId: selectedForm.id, sourceData: data }, {
        onSuccess: () => {
          alert("Answers saved correclty!")
          navigate("/")
        },
        onError: (error) => {
          console.error("Mutation failed:", error);
        }
      })
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="text-2xl font-bold text-sky-700 mb-4 text-center">Submit a Form</h2>
          <p className="text-gray-600 mb-6 text-center">Select the form you want to fill out.</p>

          <label htmlFor="select-form" className="block text-sm font-medium text-gray-700 mb-1">
            Choose a form
          </label>
          {forms && <select
            id="select-form"
            value={selectedForm?.id}
            onChange={selectForm}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-sky-500 focus:border-sky-500 p-2 mb-6"
          >
            <option value="">-- Select a form --</option>
            {forms.map((form: Form) => (
              <option key={form.id} value={form.id}>{form.name}</option>
            ))}
          </select>}
        </form>

        {
          selectedForm &&
          <DynamicForm name={selectedForm?.name} schema={selectedForm?.fields} onSubmit={submit} />
        }
      </div>

    </div>
  );
}
