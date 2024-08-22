import { disableScroll, enableScroll } from "./scroll";

export function openModal(e: Event) {
    const target = e.currentTarget as HTMLElement;
    const modal = target.parentElement?.querySelector('dialog') as HTMLDialogElement;
    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            enableScroll();
            modal.close();
        }
    });


    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            enableScroll();
            modal.close();
        }
    }
    );

    modal.showModal();
    disableScroll();
}