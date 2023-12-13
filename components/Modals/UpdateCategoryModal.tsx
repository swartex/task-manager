'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModal';
import { ChangeEvent, useState, useEffect } from 'react';
import Input from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UpdateCategoryModal = () => {
  const router = useRouter();
  const { isOpen, onClose, data, type } = useModal();

  const [title, setTitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setdescription(e.target.value);
  };

  const handleClose = () => {
    setTitle('');
    setdescription('');
    onClose();
  };

  const handelUpdateCategory = async () => {
    await axios.patch('/api/v1/category', {
      id: data.category?.id,
      title,
      description,
    });
    handleClose();
    router.refresh();
  };

  useEffect(() => {
    if (data.category) {
      setTitle(data.category.title ?? '');
      setdescription(data.category.description ?? '');
    }
  }, [data]);

  const isModalOpen = isOpen && type === 'updateCategory';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update category</DialogTitle>
          <div className="py-4">
            <Input
              value={title}
              onChange={handleChangeTitle}
              className="mb-4"
              type="text"
              placeholder="Category name"
            />
            <Input
              value={description}
              onChange={handleChangeDescription}
              type="text"
              placeholder="Category description"
            />
          </div>
          <div className="flex flex-row justify-between">
            <Button variant="default" onClick={handelUpdateCategory}>
              Update
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;
