<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div>
      <Sidebar />
    </div>
    <main class="flex-1 flex justify-center p-4">
      <div class="w-full max-w-7xl bg-green-200">
        <slot />
      </div>
    </main>
  </div>
</template>
