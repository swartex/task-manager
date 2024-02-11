'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModal';
import { ChangeEvent, useState } from 'react';
import Input from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { CheckCircle } from 'lucide-react';

const CreateCategoryModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
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

  const handelAddCategory = async () => {
    await axios.post('/api/v1/category', {
      title,
      description,
    });
    handleClose();
    router.refresh();
  };

  const isModalOpen = isOpen && type === 'createCategory';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
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
            <Button
              disabled={!title}
              variant="default"
              onClick={handelAddCategory}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-5 w-4" /> Apply
            </Button>
            <Button variant="outline" onClick={handleClose} className="flex items-center">
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
