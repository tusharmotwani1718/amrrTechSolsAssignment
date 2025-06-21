import React, { useId } from 'react';
import { useForm } from 'react-hook-form';

export default function AddItemModal({ isOpen, onClose, onAddItem }) {
  const { register, handleSubmit, reset } = useForm();
  const productId = useId();

  const onSubmit = (data) => {
    const newItem = {
      ...data,
      id: productId,
      price: parseFloat(data.price),
      stockAvailable: parseInt(data.stockAvailable, 10),
      additionalImages: data.additionalImages
        .split(',')
        .map(url => url.trim())
        .filter(Boolean)
    };

    onAddItem(newItem);
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-[var(--color-surface)] text-[var(--color-text)] rounded-lg shadow-xl max-w-lg w-full overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-semibold">Add New Item</h2>
          <button 
            onClick={() => { onClose(); reset(); }} 
            className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] text-xl"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">

          <input 
            type="hidden"
            {...register('id', { value: productId })}
          />

          <div>
            <label className="block mb-1 font-medium">Cover Image URL</label>
            <input
              type="text"
              {...register('image', { required: true })}
              className="w-full border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              {...register('title', { required: true })}
              className="w-full border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register('description', { required: true })}
              className="w-full border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { required: true, min: 0 })}
                className="w-full border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Stock Available</label>
              <input
                type="number"
                {...register('stockAvailable', { required: true, min: 0 })}
                className="w-full border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Category as SELECT */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register('category', { required: true })}
              className="w-full border border-[var(--color-border)] rounded px-3 py-2 bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">-- Select Category --</option>
              <option value="Electronics">Shirt</option>
              <option value="Apparel">Pants</option>
              <option value="Furniture">Shoes</option>
              <option value="Books">Sports Wear</option>
              <option value="Accessories">Accessories</option>
              <option value="Home Decor">Others</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Additional Image URLs (comma-separated)</label>
            <textarea
              {...register('additionalImages')}
              className="w-full border border-[var(--color-border)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              rows="2"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => { onClose(); reset(); }}
              className="px-4 py-2 rounded border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-link-hover)]"
            >
              Add Item
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
