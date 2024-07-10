import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { useAuth } from '@/context/AuthContext';
  
  export function UserNav() {
    const { authData, logout } = useAuth();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/03.png" alt="@shadcn" />
                <AvatarFallback>{authData ? `${authData.firstName.charAt(0)}` : 'G'}</AvatarFallback>
            </Avatar>
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{authData ? `${authData.firstName} ${authData.lastName}` : 'Guest'}</p>
              <p className="text-xs leading-none text-muted-foreground">
              {authData ? `${authData.email}` : 'example@domain.com'}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Admin"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Manage Users</SelectItem>
                        <SelectItem value="dark">Manage Projects</SelectItem>
                    </SelectContent>
                </Select>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Settings
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <a href="#">Log out</a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }