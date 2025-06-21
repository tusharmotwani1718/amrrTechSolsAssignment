import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { FaRegEye, FaTrash } from 'react-icons/fa';
import { ItemModal } from '../index.js';
import { useDispatch } from 'react-redux';
import { removeItem as removeItemSlice } from '../../store/Slices/itemSlice.js';
import useMessage from '../../context/MessageContext.js';



const { Meta } = Card;

function Item({
  title = "Card title",
  description = "This is the description",
  image = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  avatar = false,
  actions = [
    <SettingOutlined key="setting" />,
    <EditOutlined key="edit" />,
    <EllipsisOutlined key="ellipsis" />
  ],
  price = 200,
  category = "Others",
  stockAvailable = 0,
  id,
  additionalImages = []
}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { displayMessage } = useMessage();

  const handleDeleteItem = (itemId) => {
    dispatch(removeItemSlice({ id: itemId }));
    displayMessage('success', 'Item deleted successfully!');
    setIsModalOpen(false); // close the modal if it was open
  }

  return (
    <Card
      style={{ width: 300, borderRadius: 10, margin: 20, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e8e8e8' }}
      cover={
        <img
          alt="Item"
          src={image}
          style={{ height: 300, objectFit: 'cover' }}
        />
      }
      actions={[
        <FaRegEye key="view" style={{ fontSize: '20px', color: '#1890ff', marginLeft: '8px' }} onClick={() => { setIsModalOpen(true) }} />,
        <FaTrash key="delete" style={{ fontSize: '20px', color: '#ff4d4f', marginLeft: '8px' }} onClick={() => handleDeleteItem(id)} />,
      ]}
      variant='outlined'
      extra={
        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1890ff', display: 'flex', alignItems: 'center' }}>
          Rs.{price}
          <span style={{ fontSize: '14px', color: '#888', marginLeft: '8px' }}>{category}</span>
          <span style={{ fontSize: '14px', color: stockAvailable > 0 ? 'green' : 'red', marginLeft: '8px' }}>
            {stockAvailable > 0 ? `In Stock (${stockAvailable})` : 'Out of Stock'}
          </span>
        </div>
      }
    >
      <Meta
        avatar={avatar ? <Avatar src={image} /> : null}
        title={title}
        description={description}

      />

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={{
          title,
          description,
          coverImage: image,
          price,
          stockAvailable,
          category,
          id,
          additionalImages
        }}
      />
    </Card>


  )
}

export default Item
