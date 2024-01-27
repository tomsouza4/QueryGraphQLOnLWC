import { LightningElement, wire, track } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';

const columns = [
    {label : "Name", fieldName : "Name", type : "text"},
    {label: "Phone", fieldName: "Phone", type: "phone"},
    {label: "Email", fieldName: "Email", type: "email"},
    {label: "Account Name", fieldName: "AccountName", type: "text"},
    {label: "Annual Revenue", fieldName: "AnnualRevenue", type: "currency"},
    {label: "Created Date", fieldName: "CreatedDate", type: "date"}
]
export default class GraphQLQuery extends LightningElement {

    @track errors;

    searchValue = '';

    dataList = [];
    columnsList = columns;
    after = null;
    pageInfo;
    pageNumber = 1;
    totalCount = 0;
    pageSize = 5;
    isLoading = true;

    connectedCallback() {
        this.isLoading = true;
        console.log('***isLoading connectedCallback', this.isLoading);
    }

    get variables() {
        return {
            likeParams: '%' + this.searchValue + '%',
            limit: this.pageSize,
            after: this.after,
        };
    }

    handleChange(event) {
        event.preventDefault();
        this.searchValue = event.target.value;
    }

    @wire(graphql, {
        query: gql`
        query getContacts(
          $likeParams : String,
          $limit : Int,
          $after : String
      ) {
          uiapi {
            query {
              Contact (
                  first: $limit,
                  orderBy: { Name: { order: ASC } },
                  where: { Name: { like: $likeParams } },
                  after: $after
                ){
                edges {
                  node {
                    Id
                    Name {
                      value
                    }
                    Phone {
                      value
                    }
                    CreatedDate {
                      displayValue
                    }
                    Email {
                      value
                    }
                    Account {
                      Name {
                        value
                      }
                      Rating {
                        value
                        displayValue
                      }
                    }
                  }
                }
                totalCount
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
              }
            }
          } 
        }`,
          variables: '$variables'
    })

    wiredGraphQLQuery({ data, error }) {
        if (data) {
            console.log('***data', data);
            this.pageInfo = data.uiapi.query?.Contact?.pageInfo;
            this.totalCount = data.uiapi.query?.Contact?.totalCount;
            this.dataList = data.uiapi.query?.Contact?.edges?.map( (item) => {
                console.log('***item', item);
                return {
                    Id: item.node.Id,
                    Name: item.node.Name.value,
                    Phone: item.node.Phone.value,
                    Email: item.node.Email.value,
                    AccountName: item.node.Account?.Name.value,
                    AnnualRevenue: item.node.Account?.AnnualRevenue?.value,
                    CreatedDate: item.node.CreatedDate.displayValue
                }
            })
            this.isLoading = false;
            console.log('***isLoading wiredGraphQLQuery', this.isLoading);
        } else if (error) {
            console.log('***error', error);
            this.errors = error;
            this.isLoading = false;
        }
    }

    get totalPages () {
        return Math.ceil(this.totalCount / this.pageSize);
    }

    get disabledButton() {
        return !this.pageInfo?.hasNextPage;
    }

    get hasPreviousPg() {
        return !this.pageInfo?.hasPreviousPage;
    }

    handleReset(event) {
      event.preventDefault();
      this.after = null;
      this.pageNumber = 1;
    }

    handleNext(event) {
      event.preventDefault();
      this.isLoading = true;
      console.log('***pageInfo handleNext',this.pageInfo);
      if(this.pageInfo && this.pageInfo.hasNextPage) {
        this.after = this.pageInfo.endCursor;
        this.pageNumber++;
      } else {
        this.after = null;
        this.pageNumber = 1;
      }
    }
}