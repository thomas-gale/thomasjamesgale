import { useRef, useMemo } from "react";
import { easing } from "maath";
import { signal } from "@preact/signals-core";
import { useFrame } from "@react-three/fiber";
import { Root, Container, Text } from "@react-three/uikit";
import {
  CardFooter,
  Avatar,
  Button,
  colors,
  Defaults,
  CardContent,
} from "@react-three/uikit-default";

export const ProfileCard = () => {
  const openRef = useRef(false);
  const translateY = useMemo(() => signal(-460), []);
  const translateZ = useMemo(() => signal(0), []);
  useFrame((_, delta) => {
    easing.damp(translateY, "value", openRef.current ? 0 : -460, 0.2, delta);
    easing.damp(translateZ, "value", openRef.current ? 200 : 0, 0.2, delta);
  });
  return (
    <Root flexDirection="column" pixelSize={0.01} sizeX={4.4}>
      <Defaults>
        <Container
          backgroundColor={0xffffff}
          dark={{ backgroundColor: 0x0 }}
          borderRadius={20}
          onClick={(e) => (
            e.stopPropagation(),
            (openRef.current = !openRef.current)
          )}
          cursor="pointer"
          flexDirection="column"
          zIndexOffset={10}
          transformTranslateZ={translateZ}
        >
          <Container
            backgroundColor={0xffffff}
            dark={{ backgroundColor: 0x0 }}
            flexDirection="row"
            padding={28}
            paddingTop={28 + 4}
            alignItems="center"
            justifyContent="space-between"
            borderRadius={20}
            castShadow
          >
            <Container flexDirection="column" gap={8}>
              <Text fontWeight="normal" fontSize={24} lineHeight="100%">
                Thomas Gale
              </Text>
              <Text
                fontSize={20}
                fontWeight="medium"
                letterSpacing={-0.4}
                color={colors.primary}
              >
                Engineering interesting things
              </Text>
            </Container>
            <Container flexDirection="row">
              <Avatar width={80} src="/avatar.png" />
            </Container>
          </Container>
        </Container>
        <Container
          flexDirection="column"
          transformTranslateY={-40}
          overflow="hidden"
        >
          <Container
            paddingTop={40}
            transformTranslateY={translateY}
            backgroundColor={colors.secondary}
            borderRadius={20}
            flexDirection="column"
          >
            <CardContent marginTop={12}>
              <Text>Current working at</Text>
              <Button
                marginLeft={8}
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== "undefined") {
                    window.open("https://autodesk.com", "_blank");
                  }
                }}
              >
                <Text>Autodesk</Text>
              </Button>
            </CardContent>
            <CardFooter flexDirection="column">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== "undefined") {
                    window.open("mailto:mail@thomasjamesgale.com");
                  }
                }}
                flexDirection="row"
                width="100%"
              >
                <Text>Email</Text>
              </Button>
              <Button
                marginTop={8}
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== "undefined") {
                    window.open("https://github.com/thomas-gale", "_blank");
                  }
                }}
                flexDirection="row"
                width="100%"
              >
                <Text>Github</Text>
              </Button>
            </CardFooter>
          </Container>
        </Container>
      </Defaults>
    </Root>
  );
};
