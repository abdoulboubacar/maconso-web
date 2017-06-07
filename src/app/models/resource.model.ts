export class ResourceModel {
  id: number;
  key: string;
  name: string;
  unit: string;
  readUnit: string;

  public static getDeaultResource() : ResourceModel {
    let resource = new ResourceModel();
    resource.id = null;
    resource.key = null;
    resource.name = null;
    resource.unit = null;
    resource.readUnit = null;

    return resource;
  }
}

