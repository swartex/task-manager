'use client';

import { type Category } from '@prisma/client';
import { type ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getCategories } from '@/actions/getCategory';
import { updateTodo } from '@/actions/updateTodo';
import { Button } from '@/components/ui/button';
import DatePicker from '@/components/ui/DatePicker';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
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

const UpdateTodoModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [title, setTitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [deadline, setDeadline] = useState<Date | undefined>(new Date(Date.now()));

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
    setDeadline(undefined);
    onClose();
  };

  const { execute } = useAction(updateTodo, {
    onSuccess: (data) => {
      toast.success(`Todo "${data.title}" was updated`);
    },
    onError: (error) => toast.error(error),
  });

  const handelAddTodo = async () => {
    if (!data.todo) return;

    execute({
      id: data.todo.id,
      title,
      description,
      status,
      deadline,
      category_id: selectedCategory,
    });
    handleClose();
  };

  const handleChangeStatus = (value: boolean) => {
    setStatus(value);
  };

  useEffect(() => {
    if (data.todo) {
      setTitle(data.todo.title);
      setStatus(data.todo.status);
      setdescription(data.todo.description ?? '');
      setSelectedCategory(data.todo.category_id);

      if (data.todo.deadline) {
        setDeadline(data.todo.deadline);
      }
    }
  }, [data]);

  const isModalOpen = isOpen && type === 'updateTodo';

  useEffect(() => {
    if (isModalOpen) {
      getCategories().then((data) => setCategories(data));
    }
  }, [isModalOpen]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update todo</DialogTitle>
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
              <Select
                defaultValue={data.todo?.category_id}
                onValueChange={(value) => setSelectedCategory(value)}
              >
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
              <DatePicker defaultDate={deadline} onDateChange={setDeadline} />
              <div className="flex items-center space-x-2">
                <Switch checked={status} id="status" onCheckedChange={handleChangeStatus} />
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
            <Button variant="default" onClick={handelAddTodo}>
              Update
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoModal;
