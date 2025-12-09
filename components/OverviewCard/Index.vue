<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  content: string;
}

const { title, description, content } = defineProps<Props>();
</script>

<template>
  <Card
    class="transition ease-out duration-200 hover:-translate-y-1 hover:shadow-xl"
  >
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{{ content }}</p>
    </CardContent>
    <CardFooter>
      <Button class="cursor-pointer"> Add Member </Button>
    </CardFooter>
  </Card>
</template>
