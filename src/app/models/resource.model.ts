export class ResourceModel {
  id: number;
  key: string;
  name: string;
  unit: string;

  public static getDeaultResource() : ResourceModel {
    let resource = new ResourceModel();
    resource.id = null;
    resource.key = null;
    resource.name = null;
    resource.unit = null

    return resource;
  }
}

