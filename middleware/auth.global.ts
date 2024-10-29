export default defineNuxtRouteMiddleware((to) => {
  const device = useDevice();

  if (device.isMobile && !to.fullPath.includes('mobile')) {
    return navigateTo(Routes.MOBILE);
  } else if (!['/welcome', '/home'].includes(to.path)) {
    return navigateTo(Routes.WELCOME);
  }
});
