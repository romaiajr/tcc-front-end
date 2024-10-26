import { PDVMenusEnum } from '~/src/interfaces/pdv-menu';

export function useKeyboardNavigation() {
  const focusableElements = ref<HTMLElement[]>([]);
  const menuStore = useMenuOptions();

  const updateFocusableElements = () => {
    focusableElements.value = Array.from(
      document.querySelectorAll(
        '.focusable-input, .focusable-element, .focusable-select, [tabindex]:not([tabindex="-1"])',
      ),
    ) as HTMLElement[];
  };

  const hotkeys = (event: KeyboardEvent) => {
    updateFocusableElements();

    const currentIndex = focusableElements.value.findIndex(
      (el) => el === document.activeElement,
    );
    focusableElements.value.forEach((el, index) => {
      (el as HTMLElement).tabIndex = index + 1;
    });
    if (event.code === 'ArrowUp') {
      const prevIndex = getPrevIndex(
        currentIndex,
        focusableElements.value.length,
      );
      focusableElements.value[prevIndex]?.focus();
      event.preventDefault();
    } else if (event.code === 'ArrowDown') {
      const nextIndex = getNextIndex(
        currentIndex,
        focusableElements.value.length,
      );
      focusableElements.value[nextIndex]?.focus();
      event.preventDefault();
    } else if (event.code === 'Escape') {
      if (menuStore.activeMainMenu === PDVMenusEnum.PROJECTS) {
        if (menuStore.previousDerMenu !== undefined) {
          menuStore.setActiveDerMenu(menuStore.previousDerMenu);
        } else {
          menuStore.setActiveMainMenu(PDVMenusEnum.DEFAULT);
        }
      } else if (menuStore.activeMainMenu === PDVMenusEnum.TTS) {
        menuStore.setActiveMainMenu(PDVMenusEnum.DEFAULT);
      }
    } else if (event.key === 'Home' && event.ctrlKey) {
      menuStore.setActiveMainMenu(PDVMenusEnum.DEFAULT);
    } else if (event.key === 'Alt' && event.ctrlKey) {
      menuStore.setActiveMainMenu(PDVMenusEnum.TTS);
    }
  };

  function getPrevIndex(currentIndex: number, length: number): number {
    return currentIndex === 0 ? length - 1 : currentIndex - 1;
  }

  function getNextIndex(currentIndex: number, length: number): number {
    return currentIndex === length - 1 ? 0 : currentIndex + 1;
  }

  return { hotkeys };
}
