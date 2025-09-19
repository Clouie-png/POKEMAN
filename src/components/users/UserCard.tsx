import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: UserProps;
  onEdit: (user: UserProps) => void;
  onDelete: (userId: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://avatar.vercel.sh/${user.name}.png`} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(user)}>Edit</Button>
        <Button variant="destructive" onClick={() => onDelete(user.id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
