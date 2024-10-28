export default defineNuxtRouteMiddleware((to) => {
  if (!['/welcome', '/home'].includes(to.path)) {
    return navigateTo(Routes.WELCOME);
  }
});
