import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('viewer') viewerRef!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  title = 'pdf-esignature2';
  wvInstance: WebViewerInstance | null = null;
  private viewerInitialized = false;


  showPdf(file: any) {
    if (file && this.viewerRef) {
      // Initialize WebViewer if it hasn't been initialized yet
      if (!this.viewerInitialized) {
        WebViewer(
          {
            path: '../assets/lib',
            enableAnnotations: true,
          },
          this.viewerRef.nativeElement
        ).then((instance: WebViewerInstance) => {
          this.wvInstance = instance;
          this.setupWebViewerUI(instance);
          this.loadDocument(file);
          this.viewerInitialized = true;
        });
      } else {
        //If webviewer is initialized then we can directly load the document
        this.loadDocument(file);
      }
    }
  }

  private setupWebViewerUI(instance: WebViewerInstance) {
    const { UI } = instance;

    // Disable unnecessary UI elements
    UI.disableElements([
      'toolbarGroup-View',
      'toolbarGroup-Insert',
      'toolbarGroup-Annotate',
      'toolbarGroup-Shapes',
      'toolbarGroup-Edit',
      'toolbarGroup-Forms',
      'toolbarGroup-Text',
      'toolbarGroup-Fill',
      'toolbarGroup-FillAndSign',
      'saveAsButton',
      'printButton',
      'fullscreenButton',
      'settingsButton',
      'eraserToolButton',
      'calendarToolButton',
      'leftPanelButton',
      'viewControlsToggleButton',
      'panToolButton',
      'annotationEditToolButton',
      'searchPanelToggle',
      'notesPanelToggle',
      'view-controls-toggle-button',
      'freeTextToolButton',
      'crossStampToolButton',
      'checkStampToolButton',
      'dotStampToolButton',
      'rubberStampToolButton',
      'stylePanelToggle',
      'annotationCommentButton',
      'linkButton',
    ]);
  }
  private loadDocument(file: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (this.wvInstance) {
        this.wvInstance.Core.documentViewer.loadDocument(e.target.result, {
          filename: file.name,
        });
      }
    };
    reader.readAsArrayBuffer(file);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.showPdf(file);
    }
  }
}