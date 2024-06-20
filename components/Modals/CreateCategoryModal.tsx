'use client';
import { ChangeEvent, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModal';
import { useAction } from '@/hooks/useAction';
import { createCategory } from '@/actions/createCategory';
import Input from '../ui/input';
import { Button } from '../ui/button';

const CreateCategoryModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [description, setdescription] = useState<string>('');

  const { execute } = useAction(createCategory, {
    onSuccess: (data) => {
      toast.success(`Catetory ${data.title} created!`);
      handleClose();
    },
    onError: () => {
      toast.error('Error create category :( ');
    },
  });

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSlug(e.target.value.toLocaleLowerCase().trim().replaceAll(' ', '-'));
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setdescription(e.target.value);
  };

  const handleClose = () => {
    setTitle('');
    setdescription('');
    onClose();
  };

  const handelAddCategory = () => {
    execute({
      title,
      description,
      slug,
    });
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
              className="mb-4"
              placeholder="Category description"
            />
            <Input
              className="text-zinc-500 text-opacity-80"
              value={slug}
              disabled
              readOnly
              type="text"
            />
          </div>
          <div className="flex flex-row justify-between">
            <Button
              disabled={!title}
              variant="default"
              onClick={handelAddCategory}
              className="flex items-center gap-2"
            >
              <CheckCircle size={20} /> Apply
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
