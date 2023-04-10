<template>
  <div class="navbar bg-neutral text-neutral-content fixed">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-3xl"><i-game-icons-progression/></RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><RouterLink to="/settings"><i-ph-gear-fine-light class="text-xl"/></RouterLink></li>
      </ul>
    </div>
  </div>
</template>
