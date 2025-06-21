import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useMessage from '../../context/MessageContext.js';

export default function ItemModal({ isOpen, onClose, item }) {
  const { register, handleSubmit, reset } = useForm();
  const { displayMessage } = useMessage();
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_ITEMS_API}/sendmail`, {
        receiverEmail: data.receiverEmail
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log("Response from server:", response.data);
      displayMessage('success', 'Enquiry sent successfully!');


    } catch (error) {
      console.error("Error submitting form:", error);
      displayMessage('error', 'Failed to send enquiry. Please try again later.');
    }
    finally {
      setButtonLoading(false);
      reset();
    }
  }

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-lg shadow-xl max-w-3xl w-full overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] text-xl">&times;</button>
        </div>

        {/* Body */}
        <div className="p-4 grid md:grid-cols-2 gap-6">

          {/* Cover Image */}
          <div>
            <img
              src={item.coverImage}
              alt={item.title}
              className="rounded-lg w-full h-auto max-h-[350px] object-cover"
            />
          </div>

          {/* Item Details */}
          <div className="flex flex-col space-y-4">
            <p className="text-lg text-[var(--color-text-muted)]">{item.description}</p>
            <p><span className="font-semibold">Price:</span> ₹{item.price}</p>
            <p><span className="font-semibold">Stock Available:</span> {item.stockAvailable}</p>
            <p><span className="font-semibold">Category:</span> {item.category}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div>
                <label className="block mb-1 font-medium">Your Email here</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('receiverEmail', { required: true })}
                  className="w-full border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${buttonLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={buttonLoading}
              >
                {
                  buttonLoading ? 'Sending...' : 'Send Enquiry'
                }
              </button>
            </form>


          </div>

        </div>

        {/* Additional Images */}
        {item.additionalImages?.length > 0 && (
          <div className="p-4 border-t border-[var(--color-border)]">
            <h3 className="text-lg mb-2 font-semibold">More Images</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {item.additionalImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Additional ${idx + 1}`}
                  className="h-24 rounded object-cover border border-[var(--color-border)]"
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


