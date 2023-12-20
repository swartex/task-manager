'use client';

import { useModal } from '@/hooks/useModal';
import { Category } from '@prisma/client';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { getCategories } from '@/actions/getCategory';

const CreateTodoModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const [title, setTitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setdescription(e.target.value);
  };

  const handleClose = () => {
    setTitle('');
    setStatus(false);
    setSelectedCategory('');
    setdescription('');
    onClose();
  };

  const handelAddCategory = async () => {
    await axios.post('/api/v1/todo', {
      title,
      description,
      status,
      categoryId: selectedCategory,
    });
    handleClose();
    router.refresh();
  };

  const handleChangeStatus = (value: boolean) => {
    setStatus(value);
  };

  useEffect(() => {
    (async () => {
      const categories = await getCategories();
      setCategories(categories);
    })();
  }, []);

  const isModalOpen = isOpen && type === 'createTodo';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create todo</DialogTitle>
          <div className="py-4">
            <Input
              value={title}
              onChange={handleChangeTitle}
              className="mb-4"
              type="text"
              placeholder="Todo name"
            />
            <Input
              value={description}
              onChange={handleChangeDescription}
              type="text"
              placeholder="Todo description"
            />
            <div className="py-4">
              {categories && (
                <Select onValueChange={(value) => setSelectedCategory(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => {
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex items-center space-x-2 py-4">
              <Checkbox id="status" onCheckedChange={handleChangeStatus} />
              <label
                htmlFor="status"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Status
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <Button variant="default" onClick={handelAddCategory}>
              Add new
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

export default CreateTodoModal;
