<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <div>
      <Sidebar />
    </div>
    <main class="flex-1 flex justify-center p-8 pt-5">
      <div class="w-full max-w-7xl">
        <div class="flex justify-end mb-2">
          <span>Welcome, Citra!!</span>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>
