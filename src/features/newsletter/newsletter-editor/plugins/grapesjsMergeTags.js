// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import grapesjs from "grapesjs";
import "./grapesjsMergeTags.module.scss";

const baseConfig = {
  dataKey: "mergetag",
  blockIconClass: "fa fa-tag",
  mergeTagInitialName: "mergeTagNév",
  noSelection: "nincs kiválasztva",
  tagSelectOptions: [], // just for initialization, this is from outside, from api call response
  traitConfig: {
    typeSelect: {
      id: "typeSelectElement",
      attribute: "typeselect", // ONLY LOWERCASE BECAUSE OF HTML ATTRIBUTES!
      label: "Típus:",
      options: [
        {
          id: "system-merge-tag",
          name: "Rendszer merge tag"
        }
        // {
        // 	id: "customer-merge-tag",
        // 	name: "Ügyfél merge tag"
        // }
      ]
    },
    tagSelect: {
      id: "tagSelectElement",
      attribute: "tagselect", // ONLY LOWERCASE BECAUSE OF HTML ATTRIBUTES!
      label: "Név:",
      options: [] // later loaded from outside
    }
  }
};

// returns MergeTagPluginConfig
const mergeConfigs = pluginOptionalConfig => ({
  ...baseConfig,
  ...pluginOptionalConfig
});

export default grapesjs.plugins.add("grapesjsMergeTags", (editor, options) => {
  const opts = mergeConfigs(options);

  // block
  editor.BlockManager.add("merge-tag-block", {
    label: "Merge Tag",
    content: `<span data-mergetag="${opts.dataKey}">{{${opts.mergeTagInitialName}}}</span>`,
    attributes: { class: `mergetag-icon ${opts.blockIconClass}` }
  });

  // new select trait because the built-in type had too many bugs on initialization
  editor.TraitManager.addType("working-select", {
    createInput(props) {
      const { trait } = props;

      const selectId = trait.id || `${Math.random()}__customSelect`;
      const options = trait.get("options") || [];

      const el = document.createElement("div");
      el.innerHTML = `
        <div class="gjs-field-wrp gjs-field-wrp--select" data-input="">
          <div class="gjs-field gjs-field-select">
            <div data-input="">
              <select id="${selectId}">
                <option value="" >- ${opts.noSelection} -</option>
                  ${options
                    .map(
                      opt =>
                        `<option value="${opt.id}" ${
                          opt.selected ? "selected" : ""
                        }>${opt.name}</option>`
                    )
                    .join("")}
              </select>
            </div>
            <div class="gjs-sel-arrow">
            <div class="gjs-d-s-arrow"></div>
          </div>
          </div>
        </div>`;

      const selectElement = el.querySelector(`#${selectId}`);
      selectElement.addEventListener("change", ev => {
        trait.set("value", ev.target.value);
      });

      return el;
    }
  });

  // component settings
  editor.DomComponents.addType("Merge Tag", {
    // new component settings only applies to span elements set with the dataKey attribute provided in config
    isComponent: el => el.tagName === "SPAN" && el.dataset[opts.dataKey],
    model: {
      defaults: {
        tagName: "span",
        draggable: true,
        droppable: false,
        attributes: {
          id: "mergeTagType",
          class: "merge-tag__container"
        },
        initTraits: 0,
        // adds the new component settings traits
        traits: [
          {
            type: "working-select",
            id: opts.traitConfig.typeSelect.id,
            label: opts.traitConfig.typeSelect.label,
            name: opts.traitConfig.typeSelect.attribute,
            options: opts.traitConfig.typeSelect.options
          },
          {
            type: "working-select",
            id: opts.traitConfig.tagSelect.id,
            label: opts.traitConfig.tagSelect.label,
            name: opts.traitConfig.tagSelect.attribute,
            options: opts.traitConfig.tagSelect.options
          }
        ]
      },
      init() {
        this.on(
          `change:attributes:${opts.traitConfig.tagSelect.attribute}`,
          this.handeTagSelected
        );

        this.initTraitOptions();
      },
      handeTagSelected() {
        const tagName = this.props().attributes[
          `${opts.traitConfig.tagSelect.attribute}`
        ];
        const component = editor.getSelected();

        component.set("content", `{{${tagName || opts.mergeTagInitialName}}}`);
      },
      initTraitOptions() {
        const { tagselect, typeselect } = this.getAttributes();
        const mapOptions = (arr, initialSelected) => {
          return arr.map((el, index) => ({
            ...el,
            selected: initialSelected && initialSelected === el.id
          }));
        };

        this.getTrait(opts.traitConfig.typeSelect.attribute).set(
          "options",
          mapOptions(opts.traitConfig.typeSelect.options, typeselect)
        );

        this.getTrait(opts.traitConfig.tagSelect.attribute).set(
          "options",
          mapOptions(opts.tagSelectOptions, tagselect)
        );
      }
    }
  });
});
