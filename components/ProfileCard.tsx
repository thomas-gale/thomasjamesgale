import {
  Card,
  CardHeader,
  CardFooter,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Text,
  Stack,
} from "@react-three/uikit-default";

export const ProfileCard = () => {
  return (
    <Card className="max-w-md w-full mx-auto text-center p-6 shadow-md" asChild>
      <div>
        <CardHeader>
          <Stack gap={2} align="center">
            <Avatar src="/avatar.png" alt="Thomas Gale" />
            <Text as="h1" className="text-2xl font-bold">
              Thomas Gale
            </Text>
            <Text className="text-sm text-muted-foreground">
              Engineer of things
            </Text>
          </Stack>
        </CardHeader>
        <CardFooter className="flex justify-center gap-2 mt-4">
          <Button asChild>
            <a href="mailto:thomasjamesgale@gmail.com">Email</a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href="https://github.com/thomasjamesgale"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href="https://galesystems.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gale Systems
            </a>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
