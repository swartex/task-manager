'use client';

import { type Category } from '@prisma/client';
import { CheckCircle } from 'lucide-react';
import { type ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { createTodo } from '@/actions/createTodo';
import { getCategories } from '@/actions/getCategory';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAction } from '@/hooks/useAction';
import { useModal } from '@/hooks/useModal';

import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreateTodoModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [title, setTitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { execute } = useAction(createTodo, {
    onSuccess: (data) => {
      toast.success(`Todo "${data.title}" was create!`);
      handleClose();
    },
    onError: (error) => toast.error(error),
  });

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setdescription(e.target.value);
  };

  function handleClose() {
    setTitle('');
    setStatus(false);
    setSelectedCategory('');
    setdescription('');
    onClose();
  }

  const handelAddCategory = () => {

    //FIXME: need refactor setSelectedCategory
    if (selectedCategory) {
      execute({
        title,
        description,
        status,
        category_id: selectedCategory,
      });
    }
  };

  const handleChangeStatus = (value: boolean) => {
    setStatus(value);
  };

  const isModalOpen = isOpen && type === 'createTodo';

  useEffect(() => {
    if (isModalOpen) {
      getCategories().then((data) => setCategories(data));
    }
  }, [isModalOpen]);

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
            <Textarea
              placeholder="Todo description"
              value={description}
              onChange={handleChangeDescription}
              className="resize-none"
            />
            <div className="py-4">
              <Select onValueChange={(value) => setSelectedCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories &&
                      categories.map((category) => {
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center space-x-2 py-4">
                <Switch id="status" onCheckedChange={handleChangeStatus} />
                <label
                  htmlFor="status"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Status
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={!selectedCategory || !title}
              variant="default"
              onClick={handelAddCategory}
              className="flex items-center gap-2"
            >
              <CheckCircle size={20} /> Apply
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoModal;
